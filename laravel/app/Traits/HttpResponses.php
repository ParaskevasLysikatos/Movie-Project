<?php

namespace App\Traits;

trait HttpResponses{
    protected function successResponse($data, $message=null,$code=200){
        return response()->json([
            'status' => "Request was successful",
            'data' => $data,
          'message' => $message
        ], $code);
    }

    protected function errorResponse($data, $message=null,$code){
        return response()->json([
            'status' => "Error Occured",
            'data' => $data,
          'message' => $message
        ], $code);
    }
}
