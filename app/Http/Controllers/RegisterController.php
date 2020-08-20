<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Customer;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    //
    public function index(Request $request){

   

        $validatedData = $request->validate([
            'firstname' => 'required',
            'email' => 'required',
            'password' => 'required|confirmed|min:6',
            'password_confirmation' => 'required',
            'max_consumed' => 'required'
          ]);

          $count = count($request->beverages);
          $checkbox = [];
          $password = '';

          for($i=0; $i<$count; $i++){
            if($request->beverages[$i][1] == 1){
              $checkbox[] = $request->beverages[$i][0];
            }
          }

          if (Customer::where('email', '=', $validatedData['email'])->count() > 0) {
               return response()->json('exist');
          }
          else{
              $project = Customer::create([
                'firstname' => $validatedData['firstname'],
                'lastname' => $request->lastname,
                'email' => $validatedData['email'],
                'password' =>Hash::make( $validatedData['password']),
                'beverages' => implode(', ', $checkbox),
                'max_consumed' => $validatedData['max_consumed'],
                'gender' => $request->gender
              ]);
              return response()->json('Project created!');
            }
          
          //echo $request->gender;
       
    }
}
