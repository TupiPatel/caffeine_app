<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
    protected $fillable = ['firstname', 'lastname','email','password','confirm_passwd','beverages','max_consumed','gender','is_login'];

    public function isUserLoggedIn() {
        return $this->is_login === 1;
     }

}
