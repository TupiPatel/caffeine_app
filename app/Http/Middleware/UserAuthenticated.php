<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class UserAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if( Auth::check() )
        {
           

            // allow user to proceed with request
            if ( Auth::user()->isUserLoggedIn() ) {
                 return $next($request);
            }
        }

        abort(404); 
    }
}
