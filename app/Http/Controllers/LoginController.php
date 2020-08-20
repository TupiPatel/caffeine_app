<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Customer;

class LoginController extends Controller
{
    //
    public function index(Request $request){

   

        $validatedData = $request->validate([
            'firstname' => 'required',
            'email' => 'required',
            'passwd' => 'required',
          ]);
          $project = Customer::create([
            'firstname' => $validatedData['firstname'],
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
  
          return response()->json('Project created!');
    }
}
