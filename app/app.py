from flask import Flask,render_template

#Rutas para mostrar contenido
def create_app():
    app = Flask(__name__);



    @app.route('/')
    def index():
        return render_template('index.html');

    @app.route('/<movie_id>/')
    def movie_info(movie_id):
        return render_template('movie_template.html');
    return app;

app = create_app()