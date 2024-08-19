import os
import re
import json

# Archivo de entrada con las películas
input_file = 'E:/peliskal/peliskal.com/js/listaCompleta/peliculasLista.js'

# Leer el contenido del archivo de entrada
with open(input_file, 'r', encoding='utf-8') as file:
    content = file.read()

# Buscar el inicio y el fin de la lista de películas en el archivo
start_index = content.find('[')
end_index = content.rfind(']') + 1

if start_index != -1 and end_index != -1:
    # Extraer la lista de películas
    json_data = content[start_index:end_index]
else:
    raise ValueError("No se pudo encontrar una lista en el archivo.")

# Sanear el JSON: asegurarse de que las claves estén entre comillas dobles
json_data = re.sub(r"(['\"])?([a-zA-Z0-9_]+)(['\"])?:", r'"\2":', json_data)

# Convertir el texto JSON en una lista de Python
try:
    peliculas = json.loads(json_data)
except json.JSONDecodeError as e:
    print(f"Error al decodificar JSON: {e}")
    raise

# Directorio donde se guardarán los archivos de las películas
output_dir = 'E:/peliskal/peliskal.com/js/listaCompleta/peliculas'

# Crear el directorio si no existe
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Recorrer las películas y crear un archivo para cada una
for pelicula in peliculas:
    # Crear un nombre de archivo seguro
    nombre_archivo = re.sub(r'\W+', '_', pelicula['titulo'].lower()) + '.js'
    # Crear el contenido del archivo
    contenido = f'const pelicula = {json.dumps(pelicula, indent=2)};\nmodule.exports = pelicula;'
    # Escribir el archivo
    with open(os.path.join(output_dir, nombre_archivo), 'w', encoding='utf-8') as file:
        file.write(contenido)

print('Archivos generados con éxito.')
