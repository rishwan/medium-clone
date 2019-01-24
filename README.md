# medium-clone

## Installation

```bash
git clone https://github.com/rishwan/medium-clone.git
cd medium-clone
composer install
npm install
php artisan key:generate
php artisan jwt:secret
```

After that's done. Please proceed to update the .env file with your preferred database and its credentials.

Once done, run the migration and seeds. This might take a while.

### To run the migration after a fresh install

```bash
php artisan migrate --seed
```

### To refresh the migration and seeds

```bash
php artisan migrate:refresh --seed
```
