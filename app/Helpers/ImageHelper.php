<?php

namespace App\Helpers;

class ImageHelper
{
	/**
	 * Compress and convert image to webp
	 *
	 * @param string $sourcePath  - temporary file path dari upload
	 * @param string $destinationPath - lokasi simpan file webp
	 * @param int $quality - kualitas webp (0-100)
	 * @param int|null $maxWidth - max width resize (null = no resize)
	 * @param int|null $maxHeight - max height resize (null = no resize)
	 * @return bool
	 */
	public static function compressToWebp(
		string $sourcePath,
		string $destinationPath,
		int $quality = 80,
		?int $maxWidth = 1920,
		?int $maxHeight = 1080
	): bool {
		// ambil info
		[$width, $height, $type] = getimagesize($sourcePath);


		switch ($type) {
			case IMAGETYPE_JPEG:
				$image = imagecreatefromjpeg($sourcePath);
				break;
			case IMAGETYPE_PNG:
				$image = imagecreatefrompng($sourcePath);
				break;
			case IMAGETYPE_GIF:
				$image = imagecreatefromgif($sourcePath);
				break;
			case IMAGETYPE_WEBP:
				$image = imagecreatefromwebp($sourcePath);
				break;
			default:
				return false;
		}

		if (!$image) return false;

		// cek resize
		if ($maxWidth && $maxHeight && ($width > $maxWidth || $height > $maxHeight)) {
			$ratio = min($maxWidth / $width, $maxHeight / $height);
			$newWidth = (int)($width * $ratio);
			$newHeight = (int)($height * $ratio);

			$resized = imagecreatetruecolor($newWidth, $newHeight);
			imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

			imagedestroy($image);
			$image = $resized;
		}

		// simpan jadi webp
		$result = imagewebp($image, $destinationPath, $quality);

		imagedestroy($image);

		return $result;
	}
}