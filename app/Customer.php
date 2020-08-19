<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
    protected $fillable = ['firstname', 'lastname','email','password','beverages','max_consumed','gender','is_login'];

}
