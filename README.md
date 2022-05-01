# Prode

![](resources/assets/img/favicon/apple-touch-icon-120x120.png)

Web application to play [PRODE](https://bit.ly/2HDeWPa) with friends.

## Requirements
- PHP 8
- Composer
- Docker

## Setup

### Environment variables

Copy the `.env.example` file, rename it to `.env`. Some variables are already filled to work with the local docker containers provided.

### Docker containers

Start the containers using [Laravel Sail](https://laravel.com/docs/9.x/sail#introduction)
```bash
./vendor/bin/sail up
```

It will run the following containers:
- [Laravel](https://laravel.com/docs/9.x) development server running at http://localhost
- MySQL
- Redis

### Dependencies and local development

Install the php dependencies
```bash
./vendor/bin/sail composer install
```

Compile assets with [Mix](https://laravel.com/docs/9.x/mix)
```bash
./vendor/bin/sail npm install
```

Watch for js and sass changes by keeping this command running
```bash
./vendor/bin/sail npm run watch
```

### DB migrations

Run the DB migrations (located at `database/migrations/`) 
```bash
./vendor/bin/sail artisan migrate
```

#### Schema
- `users`: Contains the basic information about users (like name, email, locale, etc.) and points earned from the forecasts submitted. 
- `user_logins`: Contains all the third-party login accesses associated to each user (google, facebook, github, etc)
- `game_sets`: Represents an entity that group games, commonly known as "Matchday" or "Fecha" in spanish.
- `games`: Represents a game that belongs to a set. The `computed` field states that points have been given to all forecasts associated to it.
- `forecasts`: Represents a forecast of a specific game that belongs to a user. After computed the `assertions` field will be the source of truth of points earned based on the game result.
- `parties`: Represents a group of users that compete together.
- `party_users`: Many-to-many table between `parties` and `users`.
- `party_join_requests`: Contains records of join requests from users to parties.
- `failed_jobs`: Laravel table to store async jobs that failed with all details.
- `migrations`: Laravel table to keep track of DB migrations.

### Admin users

Some functionalities are only authorized to a set of admin users for the entire Prode app, like loading match results, computing forecasts and seeing general stats. 
These users can be listed in the `config/auth.php` file under the `admins` key.  

## Queues and async jobs

All email notifications are queued in `redis`, this can be configured differently in the `config/queue.php` file.

There are two custom queues configured:
- `emails`: for email notifications
- `scheduled`: to execute jobs from the scheduler

### Running and monitoring queues

In order to process messages from the queues, keep running the following command
```bash
./vendor/bin/sail artisan queue:work --queue=emails,scheduled
```

A better alternative is to run [Laravel Horizon](https://laravel.com/docs/9.x/horizon#introduction) that not only will keep the command running to process queue messages, but also will allow you to monitor the jobs processed and failed.
```bash
./vendor/bin/sail artisan horizon
```
Access the dashboard: http://localhost/horizon (only granted to logged admin users, `auth.admins` config)

### Email notifications

You can test your email provider using the command `app/Console/Commands/TestEmailProvider`

```bash
./vendor/bin/sail artisan notify:test
```

### Scheduler

Currently, there's one scheduled job to notify users about missing forecasts for upcoming games.
It can be configured at `config/domain/php` on `reminders.forecasts`.

In order to run the scheduler execute the following command
```bash
./vendor/bin/sail artisan schedule:work
```

## Testing

```bash
./vendor/bin/sail test
```

## Commands

Artisan commands are located within `app/Console/Commands`

They can be run using Sail like this:
```bash
./vendor/bin/sail artisan party:create --name="Topos"
```

## Prode configs 

Configurations from the app domain can be found in the `config/domain.php` file.

There you can change things like:
- Tournament timezone and schedule.
- Teams participating
- Reminders scheduled
- Points given per assertion

The timezone used for date times stored in the database is set on `config/app.php` at `timezone`

### Localization

Localization files can be found under `lang/<language>/`

Default and supported locales are located on `config/app.php` (`locale`, `supported_locales`)


## Running in production

- Keeping queues running and monitored through a [supervisor](https://laravel.com/docs/9.x/queues#supervisor-configuration)
- [Deploying Horizon](https://laravel.com/docs/9.x/horizon#deploying-horizon)
- [DigitalOcean](https://digitalocean.com/): cloud computing
- [Forge](https://forge.laravel.com/): Useful server provisioner by Laravel
- [Sentry](https://sentry.io/): error monitoring 

## Other Useful Links
- [Sendinblue](https://sendinblue.com/): email provider
- Flags from all countries in SVG (https://github.com/lipis/flag-icons)
