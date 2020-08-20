<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Customer;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;


class LoginController extends Controller
{
    //
    public function __construct(Request $request) {
      
     
     $this->middleware(function ($request, $next) {
      // fetch session and use it in entire class with constructor
      $this->cart_info = session()->get('my_name');
      
      //exit;
     // echo $this->cart_info;
    //  exit;
      if($this->cart_info != '')
      {
        return response()->json('sucess');
        exit;
      }
        return $next($request);
      });

     
   }



    public function index(Request $request){

     
  
        $validatedData = $request->validate([
            'email' => 'required',
            'password' => 'required',
          ]);
          $data =  Customer::where('email', '=', $validatedData['email'])->first();

         
         if (Hash::check($validatedData['password'],$data->password))
         {
           $data->is_login = 1;
           $data->save();
           $request->session()->put('my_name','Virat Gandhi');
          return response()->json('sucess');
         }
         else{
          return response()->json('fail');
         }
        
     
         // return response()->json('Project created!');
    }

    public function logOut() {

      Session::forget('user');
      return response()->json('fail');
  
  }
}
