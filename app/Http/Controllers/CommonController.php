<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\File;

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
}
