# django-react-minimal

### Backend

django-admin startproject backend

cd backend

python manage.py migrate

django-admin startapp myapp

In `settings.py`
1. add myapp
2. add 'rest_framework'
3. add CORS

create make urls.py in myapp, include urls in backend

python manage.py runserver

// create model

create serializers.py in myapp

python manage.py makemigrations

python manage.py migrate

### Frontend

npx create-next-app@latest

npm run dev