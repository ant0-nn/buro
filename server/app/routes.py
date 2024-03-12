import base64
import os

from flask import jsonify, request
from app import app
from app import sql_api as sql_api

@app.route('/api/getprojectsnoimage', methods=['GET'])
def getprojectsnoimage():
    try:
        return jsonify(sql_api.get_projects()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/addproject', methods=['POST'])
def addproject():
    try:
        data = request.json
        mainimage = data.get('mainimage')
        images = data.get('images')
        name = data.get('name')
        square = data.get('square')
        year = data.get('year')
        section = data.get('section')
        typeFilter = data.get('typeFilter')
        city = data.get('city')

        return jsonify(sql_api.add_project(mainimage, images, name, square, year, section, typeFilter, city)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/remproject', methods=['POST'])
def remproject():
    try:
        data = request.json
        name = data.get('name')
        return jsonify(sql_api.rem_project(name)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/getprojectswithimage', methods=['GET'])
def getprojectswithimage():
    try:
        projects = sql_api.get_projects()
        projects_json = []
        image_path = "app/static/image/"

        for project in projects:
            images_array = []

            mainimage = project[0]
            images = project[1]

            with open(image_path + mainimage, 'rb') as image_file:
                image_data = image_file.read()
            encoded_mainimage = base64.b64encode(image_data).decode('utf-8')

            images = images.split(',')
            for i in images:
                print(image_path + i)
                with open(image_path + i, 'rb') as image_file:
                    image_data = image_file.read()
                images_array.append(base64.b64encode(image_data).decode('utf-8'))

            news_with_image = {
                'mainimage': encoded_mainimage,
                'images': images_array,
                'name': project[2],
                'square': project[3],
                'year': project[4],
                'section': project[5],
                'typeFilter': project[6],
                'city': project[7],
                'id': project[8]
            }
            projects_json.append(news_with_image)
        return jsonify(projects_json), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/getprojectswithimageprev', methods=['GET'])
def getprojectswithimageprev():
    try:
        projects = sql_api.get_projects()
        projects_json = []
        image_path = "app/static/image/"

        for project in projects:
            mainimage = project[0]

            with open(image_path + mainimage, 'rb') as image_file:
                image_data = image_file.read()
            encoded_mainimage = base64.b64encode(image_data).decode('utf-8')

            news_with_image = {
                'mainimage': encoded_mainimage,
                'name': project[2],
                'square': project[3],
                'year': project[4],
                'section': project[5],
                'typeFilter': project[6],
                'city': project[7],
                'id': project[8]
            }
            projects_json.append(news_with_image)
        return jsonify(projects_json), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/getprojectbyname', methods=['GET'])
def getprojectbyname():
    try:
        id = request.args.get('id')
        project = sql_api.get_project_by_name(id)

        image_path = "app/static/image/"

        images_array = []

        mainimage = project[0]
        images = project[1]

        with open(image_path + mainimage, 'rb') as image_file:
            image_data = image_file.read()
        encoded_mainimage = base64.b64encode(image_data).decode('utf-8')

        images = images.split(',')
        for i in images:
            with open(image_path + i, 'rb') as image_file:
                image_data = image_file.read()
            images_array.append(base64.b64encode(image_data).decode('utf-8'))

        news_with_image = {
            'mainimage': encoded_mainimage,
            'images': images_array,
            'name': project[2],
            'square': project[3],
            'year': project[4],
            'section': project[5],
            'typeFilter': project[6],
            'city': project[7],
            'id': project[8]
        }
        return jsonify(news_with_image), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/getflowersnoimage', methods=['GET'])
def getflowersnoimage():
    try:
        return jsonify(sql_api.get_flowers()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/addflower', methods=['POST'])
def addflower():
    try:
        data = request.json
        mainphoto = data.get('mainphoto')
        images = data.get('images')
        square = data.get('square')
        name = data.get('name')
        year = data.get('year')
        id_s = data.get('id')

        return jsonify(sql_api.add_flower(mainphoto, images, square, name, year, id_s)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/remflower', methods=['POST'])
def remflower():
    try:
        data = request.json
        name = data.get('name')
        return jsonify(sql_api.rem_flower(name)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/getflowerswithimage', methods=['GET'])
def getflowerswithimage():
    try:
        flowers = sql_api.get_flowers()
        flowers_json = []
        image_path = "app/static/image/"

        for flower in flowers:

            mainphoto = flower[0]

            with open(image_path + mainphoto, 'rb') as image_file:
                image_data = image_file.read()
            encoded_mainphoto = base64.b64encode(image_data).decode('utf-8')

            with open(image_path + flower[1], 'rb') as image_file:
                image_data = image_file.read()
            img = base64.b64encode(image_data).decode('utf-8')

            news_with_image = {
                'mainphoto': encoded_mainphoto,
                'images': img,
                'name': flower[3],
                'square': flower[2],
                'year': flower[4],
                'id': flower[5]
            }
            flowers_json.append(news_with_image)
        return jsonify(flowers_json), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


