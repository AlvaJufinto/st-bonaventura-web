import React, { useEffect, useRef, useState } from "react";

import Loading from "@/Components/admin/Loading";
import { debounce } from "@/utils";

export default function SelectHead({ data, setData, currentHead }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableUsers, setAvailableUsers] = useState(
    currentHead ? [currentHead] : []
  );
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [displayedHead, setDisplayedHead] = useState(currentHead || null);

  const badgeRef = useRef(null);
  const popoverRef = useRef(null);

  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  useEffect(() => {
    if (data?.head) {
      setDisplayedHead(data.head);
    } else if (data?.head_id === null) {
      setDisplayedHead(null);
    }
  }, [data?.head_id, data?.head]);

  useEffect(() => {
    if (isOpen) {
      setLoadingUsers(true);
      fetchUsersDebounced(searchTerm);
    } else {
      setAvailableUsers([]);
    }
  }, [isOpen, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        badgeRef.current &&
        !badgeRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleUserSelect = (user) => {
    setData("head_id", user.id);
    setDisplayedHead(user);
    setIsOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderUserList = () => {
    if (loadingUsers) {
      return (
        <div className="flex gap-1 items-center justify-center p-4 font-secondary">
          <Loading />
          <div className="text-sm text-gray-600 text-center font-secondary">
            Loading...
          </div>
        </div>
      );
    }

    if (availableUsers?.length === 0 && searchTerm.trim() !== "") {
      return (
        <div className="p-2 text-sm text-gray-600 text-center font-secondary">
          Tidak ada user ditemukan untuk "{searchTerm}".
        </div>
      );
    }

    if (availableUsers?.length === 0 && searchTerm.trim() === "") {
      return (
        <div className="p-2 text-sm text-gray-600 text-center font-secondary">
          Ketik untuk mencari user.
        </div>
      );
    }

    return (
      <div>
        {availableUsers?.map((user) => (
          <div
            key={user.id}
            className={`flex font-secondary px-2 py-1 hover:bg-blue-100 cursor-pointer text-sm border-b last:border-b-0 items-center ${
              user.id === data.head_id ? "bg-blue-200" : ""
            }`}
            onClick={() => handleUserSelect(user)}
          >
            <img
              className="size-10 rounded-full mr-2 flex-shrink-0"
              src={
                user?.profile_picture
                  ? `${ASSET_URL}/uploads/${user?.profile_picture}`
                  : "https://fisika.uad.ac.id/wp-content/uploads/blank-profile-picture-973460_1280.png"
              }
              alt=""
            />
            <div className="flex flex-col flex-1 min-w-0">
              <div className="text-sm font-semibold font-secondary">
                {user.name}
              </div>
              <span className="text-xs text-gray-500 font-secondary break-words">
                {user.email}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const fetchUsers = async (term) => {
    try {
      const apiRouteName = "api.get-users";
      const url = new URL(route(apiRouteName));
      url.searchParams.append("search", term);

      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const json = await response.json();
      setAvailableUsers(
        currentHead ? [currentHead, ...json?.data] : [...json?.data]
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      setAvailableUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchUsersDebounced = React.useCallback(debounce(fetchUsers, 1000), []);

  const badgeText = displayedHead ? displayedHead?.name : "Pilih Ketua";

  return (
    <div className="relative w-full">
      <button
        ref={badgeRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-md bg-slate-200 p-2 flex items-center justify-between cursor-pointer hover:bg-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-left font-secondary"
        type="button"
      >
        <img
          className="size-10 rounded-full mr-2 flex-shrink-0"
          src={
            displayedHead?.profile_picture
              ? `${ASSET_URL}/uploads/${displayedHead?.profile_picture}`
              : "https://fisika.uad.ac.id/wp-content/uploads/blank-profile-picture-973460_1280.png"
          }
          alt=""
        />
        <span className="flex-1 min-w-0 truncate font-secondary">
          {badgeText}
        </span>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 top-full mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          style={{ left: 0 }}
        >
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Cari pengurus..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="font-secondary w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {renderUserList()}
        </div>
      )}
    </div>
  );
}
