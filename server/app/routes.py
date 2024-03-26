import base64
import os

from flask import jsonify, request, send_from_directory
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

        for project in projects:
            images_array = []
            images = project[1]

            images = images.split(',')
            for i in images:
                images_array.append(i)

            news_with_image = {
                'mainimage': project[0],
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

        for project in projects:
            news_with_image = {
                'mainimage': project[0],
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

        images_array = []

        images = project[1]

        images = images.split(',')
        for i in images:
            images_array.append(i)

        news_with_image = {
            'mainimage': project[0],
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

        for flower in flowers:
            news_with_image = {
                'mainphoto': flower[0],
                'images': flower[1],
                'name': flower[3],
                'square': flower[2],
                'year': flower[4],
                'id': flower[5]
            }
            flowers_json.append(news_with_image)
        return jsonify(flowers_json), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/img/<filename>', methods=['GET'])
def serve_image(filename):
    return send_from_directory(app.config['IMAGE_FOLDER'], filename)
