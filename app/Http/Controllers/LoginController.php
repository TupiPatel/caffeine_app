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
            'email' => 'required',
            'passwd' => 'required',
          ]);
  
         /* $project = Customer::create([
            'email' => $validatedData['name'],
            'password' => $validatedData['description'],
          ]);*/
  
          return response()->json('Project created!');
    }
}
