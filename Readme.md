# Prode

Web application to play [PRODE](https://bit.ly/2HDeWPa) with friends.

## Requirements
- PHP 8
- Composer
- Docker

## Setup

### Environment variables

Copy the `.env.example` file, rename it to `.env`. Some env vars are already filled to run with the local docker container provided.

### Docker container

Start app the container using [Laravel Sail](https://laravel.com/docs/9.x/sail#introduction)
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

## Queues and async jobs

All email notifications are queued in `redis`, this can be configured differently in the `config/queue.php` file.

In order to process messages form the queue, run this command 
```bash
./vendor/bin/sail artisan queue:work
```

There are two custom queues configured:
- `emails`: for email notifications
- `scheduled`: to execute jobs from the scheduler 

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

### Monitoring queues

Run [Laravel Horizon](https://laravel.com/docs/9.x/horizon#introduction) to monitor queues
```bash
./vendor/bin/sail artisan horizon
```
Access the dashboard: http://localhost/horizon

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


## Deployment

TODO

## Useful Links
- DigitalOcean: cloud computing (https://digitalocean.com/)
- Forge: Useful server provisioner by Laravel (https://forge.laravel.com/)
- Sendinblue: email provider (https://sendinblue.com/)
- Sentry: error monitoring (https://sentry.io/)
- Flags from all countries in SVG (https://github.com/lipis/flag-icons)
