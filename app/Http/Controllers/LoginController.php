<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Customer;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    //
    public function index(Request $request){

   

        $validatedData = $request->validate([
            'email' => 'required',
            'password' => 'required',
          ]);
          $data =  Customer::where('email', '=', $validatedData['email'])->first();

         
         if (Hash::check($validatedData['password'],$data->password))
         {
          return response()->json('sucess');
         }
         else{
          return response()->json('fail');
         }
        
  //echo $validatedData['email'];
 
         // return response()->json('Project created!');
    }
}
