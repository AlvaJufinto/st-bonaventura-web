<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
	public function getFileNameAndDirectory(string $fileName, string $fileType, string $directory)
	{
		$year = now()->format('Y');
		$month = now()->format('m');

		$slug = Str::slug($fileName);

		$fileName = $slug . '-' . Str::uuid() . '.' . $fileType;

		return [
			'directory' => "{$directory}/{$year}/{$month}",
			'fileName' => $fileName
		];
	}

	public function uploadFile(
		UploadedFile $file,
		string $directory,
		string $baseName,
		string $disk = 's3'
	): string {
		$slug = Str::slug($baseName);
		$fileName = $slug . '-' . Str::uuid() . '.pdf';

		/** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
		$disk = Storage::disk('s3');

		$path = $disk->putFileAs(
			$directory,
			$file,
			$fileName,
			'public'
		);


		if (!$path) {
			throw new \Exception('Upload failed.');
		}

		return $path;
	}
}
