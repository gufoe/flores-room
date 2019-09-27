<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller {
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function uploadImage() {
        $token = str_random(10);
        file_put_contents(public_storage("$token.jpg"), base64_decode(request('base64')));
        if (!is_file(public_storage("$token.jpg"))) abort(400, 'Invalid image');
        img_resize(public_storage("$token.jpg"), public_storage("$token-lg.jpg"), [
            'width' => 1000,
            'quality' => 85,
        ]);
        if (!is_file(public_storage("$token-lg.jpg"))) {
            unlink(public_storage("$token.jpg"));
            abort(400, 'Cannot resize image');
        }
        img_resize(public_storage("$token.jpg"), public_storage("$token-md.jpg"), [
            'width' => 500,
            'quality' => 85,
        ]);
        img_resize(public_storage("$token.jpg"), public_storage("$token-sm.jpg"), [
            'width' => 200,
            'quality' => 85,
        ]);
        // unlink(public_storage("$token.jpg"));
        return $token;
    }
}
