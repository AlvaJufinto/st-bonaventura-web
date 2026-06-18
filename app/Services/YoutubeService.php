<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class YouTubeService
{
	public function getEkopraksisPlaylistVideos()
	{
		$response = Http::get(
			'https://www.googleapis.com/youtube/v3/playlistItems',
			[
				'part' => 'snippet,status',
				'playlistId' => "PLOgX99Tqfu-0JIhEllKrzRPaZhdD7IWlw",
				'maxResults' => 5,
				'key' => config('services.youtube.key'),
			]
		);

		return collect($response->json()['items'] ?? [])
			->filter(function ($item) {
				return ($item['status']['privacyStatus'] ?? null) === 'public';
			})
			->map(function ($item) {
				return [
					'title' => $item['snippet']['title'],
					'thumbnail' =>
					$item['snippet']['thumbnails']['high']['url'] ?? "",
					'video_id' =>
					$item['snippet']['resourceId']['videoId'],
					'published_at' =>
					$item['snippet']['publishedAt'],
					'description' =>
					$item['snippet']['description'],
				];
			});
	}
}
