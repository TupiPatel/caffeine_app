<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Customer;

class RegisterController extends Controller
{
    //
    public function index(Request $request){

   

        $validatedData = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required',
            'passwd' => 'required',
            'confirm_passwd' => 'required',
          ]);
         /* $project = Customer::create([
            'firstname' => $validatedData['firstname'],
            'lastname' => $validatedData['lastname'],
            'email' => $validatedData['email'],
            'password' => $validatedData['passwd'],
          ]);
         /* $project = Customer::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => $request->passwd,
            'beverages' => $request->beverages,
            'max_consumed' => $request->max_consumed,
            'is_login' => 1
          ]);*/
  
          print_r($request->beverages);
         // return response()->json('Project created!');
    }
}
