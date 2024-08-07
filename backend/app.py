from tensorflow.keras.preprocessing import image
import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS
import base64
import os

app = Flask(__name__)
CORS(app)  

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/predict', methods=['POST'])
def predict():
    print('Request received')
    data = request.get_json()
    if not data:
        return jsonify({"message": "No image found"}), 400
    base64_string = data.get('base64')

    if base64_string:
        image_data = base64.b64decode(base64_string)

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'image.jpeg')
        with open(file_path, 'wb') as file:
            file.write(image_data)

    # Define the class names and load the model
    class_names = ['alpine sea holly', 'anthurium', 'artichoke', 'azalea', 'ball moss', 'balloon flower', 'barbeton daisy', 'bearded iris', 'bee balm', 'bird of paradise', 'bishop of llandaff', 'black-eyed susan', 'blackberry lily', 'blanket flower', 'bolero deep blue', 'bougainvillea', 'bromelia', 'buttercup', 'californian poppy', 'camellia', 'canna lily', 'canterbury bells', 'cape flower', 'carnation', 'cautleya spicata', 'clematis', "colt's foot", 'columbine', 'common dandelion', 'corn poppy', 'cyclamen', 'daffodil', 'desert-rose', 'english marigold', 'fire lily', 'foxglove', 'frangipani', 'fritillary', 'garden phlox', 'gaura', 'gazania', 'geranium', 'giant white arum lily', 'globe thistle', 'globe-flower', 'grape hyacinth', 'great masterwort', 'hard-leaved pocket orchid', 'hibiscus', 'hippeastrum', 'japanese anemone', 'king protea', 'lenten rose', 'lotus lotus', 'love in the mist', 'magnolia', 'mallow', 'marigold', 'mexican aster', 'mexican petunia', 'monkshood', 'moon orchid', 'morning glory', 'orange dahlia', 'osteospermum', 'oxeye daisy', 'passion flower', 'pelargonium', 'peruvian lily', 'petunia', 'pincushion flower', 'pink primrose', 'pink-yellow dahlia', 'poinsettia', 'primula', 'prince of wales feathers', 'purple coneflower', 'red ginger', 'rose', 'ruby-lipped cattleya', 'siam tulip', 'silverbush', 'snapdragon', 'spear thistle', 'spring crocus', 'stemless gentian', 'sunflower', 'sweet pea', 'sweet william', 'sword lily', 'thorn apple', 'tiger lily', 'toad lily', 'tree mallow', 'tree poppy', 'trumpet creeper', 'wallflower', 'water lily', 'watercress', 'wild pansy', 'windflower', 'yellow iris']
 
    model = tf.keras.models.load_model('./flowers_model.keras')

    # Adjust target_size to your model's expected input size
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'image.jpeg')
    img = image.load_img(file_path, target_size=(160, 160))  

    # Convert the image to a NumPy array
    img_array = image.img_to_array(img)
    
    # Add an extra dimension to match the model's input shape (batch size of 1)
    img_array = np.expand_dims(img_array, axis=0)

    # Perform the prediction
    predictions = model.predict(img_array)
    max_index = np.argmax(predictions[0])
    max_index_val = max_index+ 1
    predicted_label = class_names[max_index]

    # Print the predictions
    print(predicted_label)
    if predicted_label: 
        return jsonify({"predicted_label": predicted_label, "index": max_index_val}), 200
    else:
        return jsonify({"message": "No prediction"} ), 400

if __name__ == '__main__':
    app.run(debug=True)
