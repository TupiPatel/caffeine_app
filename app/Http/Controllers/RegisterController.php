<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Customer;
use App\Transaction;
use Illuminate\Support\Carbon;
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
              $User = Customer::create([
                'firstname' => $validatedData['firstname'],
                'lastname' => $request->lastname,
                'email' => $validatedData['email'],
                'password' =>Hash::make( $validatedData['password']),
                'beverages' => implode(', ', $checkbox),
                'max_consumed' => $validatedData['max_consumed'],
                'gender' => $request->gender
              ]);
              return response()->json('Customer created!');
            }
          
          //echo $request->gender;
       
    }

    public function customerInfo($id){
      $dataCust = Customer::find($id);

      $dataCust = $dataCust->toArray();

      $collection = collect($dataCust);

      $result = $collection->except('password');

      
      return $result->toJson();
    }

    public function orderCreate(Request $request){

      $validatedData = $request->validate([
        'drink' => 'required',
        'size' => 'required',
      ]);

      

      $Order = Transaction::create([
        'custId' =>$request->custId,
        'typeOfDrink' => $validatedData['drink'],
        'size' => $validatedData['size'],
        'caffeine' => $request->caffeine,
      ]);

      
      return $Order->toJson();

    }

    public function transaction($id){

      $dataDaily = Transaction::where('custId', '=', $id)
                              ->whereDate('created_at','=', Carbon::today())->get();

   //   print_r($dataDaily);
    //  exit;

      $dataDaily = $dataDaily->toArray();

      $collectionDaily = collect($dataDaily);

      $result = $collectionDaily;

      
      return $result->toJson();

    }
}
