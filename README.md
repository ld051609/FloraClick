# FloraCheck

An app that enables users to take a photo of a plant, utilizes an AI model to identify the plant, and then saves it to their personal collection.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- **Login**: Securely log in to your account to access and manage your plant collection.
- **Take Picture**: Capture a photo of a plant using your device’s camera.
- **Plant Identification**: Utilize AI to identify the plant from the photo.
- **View Profile**: Access and view your personal plant collection and details about each plant.

## Technologies

- **React Native**
- **Expo** (if applicable)
- **Flask** (backend)
- **TensorFlow** (for AI model)

## Installation

### Prerequisites

- Node.js (version x.x.x)
- npm or yarn (package managers)
- React Native CLI (if not using Expo)
- Python (version x.x.x)
- pip (Python package manager)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repository.git
    ```

2. Navigate to the project directory:
    ```bash
    cd your-repository
    ```

3. Install Node.js dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

4. Set up environment variables (if applicable). Create a `.env` file based on the provided example:
    ```bash
    cp .env.example .env
    ```

5. Set up the Python environment:
    - Navigate to the backend directory (if applicable):
      ```bash
      cd backend
      ```

    - Create a virtual environment (optional but recommended):
      ```bash
      python -m venv venv
      ```

    - Activate the virtual environment:
      - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```
      - On Windows:
        ```bash
        .\venv\Scripts\activate
        ```

    - Install Python dependencies:
      ```bash
      pip install -r requirements.txt
      ```

6. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

## Usage

Provide instructions on how to run and test the app.

- To run the app on iOS:
    ```bash
    npm run ios
    # or
    yarn ios
    ```

- To run the app on Android:
    ```bash
    npm run android
    # or
    yarn android
    ```

- For Expo users:
    ```bash
    expo start
    ```

Include any additional usage information or commands.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
