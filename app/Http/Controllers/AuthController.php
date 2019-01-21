<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;

class AuthController extends Controller
{
    //
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        /*
         * store the username and password from the request into
         * local variables
         */
        $username = $request->get('email');
        $password = $request->get('password');

        /*
         * Attempt authentication with the given username and password
         */
        if(! $token = auth()->attempt(['email' => $username, 'password' => $password]))
        {
            /*
             * If invalid, log the event
             */
            Log::alert($request->ip() . ' - Invalid login attempt detected for username: '.$username);

            /*
             * Return error response
             */
            $payload = [
                'status_flag' => 'error',
                'status_code' => 401,
                'meta' => [
                    'description' => 'No matching record found for the given credentials',
                ],
                'data' => [
                    'body' => 'Invalid Credentials'
                ]
            ];

            return $this->payload($payload);

        }

        Log::info($request->ip() . ' - Successful login');

        $payload = [
            'status_flag' => 'ok',
            'status_code' => 200,
            'data' => [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 60,
                'user' => \Auth::user()
            ]
        ];

        return $this->payload($payload);

    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        Log::info( request()->ip() . ' - '.auth()->user->username.' logged out');

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }


    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
