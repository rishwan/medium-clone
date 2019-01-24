<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CommonController extends Controller
{
    public function getImage($directory, $filename)
    {

        $path = storage_path('app/public/'.$directory.'/'. $filename);

        if (!File::exists($path)) {
            dd('something went wrong');
            abort(404);
        }

        $img = Image::make($path);

        return $img->response('jpg', 70);
    }

    public function imageUpload(request $request)
    {
        $path = $request->file('article_image')->store('article_images');

        $image_name = $request->article_image->hashName();

        $img = Image::make(Storage::get($path));

        Storage::put("public/article_thumb_large/" . $image_name, $img->fit(610, 372)->encode('jpg', 75));
        Storage::put("public/article_thumb_medium/" . $image_name, $img->fit(389, 237)->encode('jpg', 75));
        Storage::put("public/article_thumb_small/" . $image_name, $img->fit(128, 128)->encode('jpg', 75));

        $payload = [
            'status_flag' => 'ok',
            'status_code' => 200,
            'data' => [
                'filename' => $image_name
            ]
        ];

        return $this->payload($payload);
    }
}
