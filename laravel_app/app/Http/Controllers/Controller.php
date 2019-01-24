<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function payload($payload)
    {
        $data = [
            'status' => $payload['status_flag'],
            'code' => $payload['status_code'],
            'messages' => [
                'response_id' => uniqid(),
                'client_request_id' => Request::header('request_id'),
                'client_ip' => Request::ip()
            ],
            'result' => $payload['data']
        ];

        /*
         * if payload has meta info
         * Append all the meta with their keys in to the message key
         * in the return payload
         */
        if(isset($payload['meta']))
        {
            foreach($payload['meta'] as $key => $value)
            {
                $data['messages'][$key] = $value;
            }
        }

        return response()->json(
            $data,
            $payload['status_code']
        );
    }
}
