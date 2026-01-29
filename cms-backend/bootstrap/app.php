<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
            'abilities'=> \Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
            'ability'=> \Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class,
            'admin' => \App\Http\Middleware\RoleMiddleware::class,
            'staff' => \App\Http\Middleware\RoleMiddleware::class,
            'user' => \App\Http\Middleware\RoleMiddleware::class,
        ]);

        $middleware->api([
            EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            '\Illuminate\Routing\Middleware\SubstituteBindings',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
