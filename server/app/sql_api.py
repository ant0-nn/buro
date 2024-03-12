import sqlite3


def get_db():
    conn = sqlite3.connect("bd_lite.db")
    return conn, conn.cursor()


# ----------------- Project -----------------
def get_projects():
    conn, cursor = get_db()
    cursor.execute("SELECT * FROM project")
    projects = cursor.fetchall()
    cursor.close()
    conn.close()
    return projects


def add_project(mainimage, images, name, square, year, section, typeFilter, city):
    conn, cursor = get_db()
    cursor.execute("INSERT INTO project (mainimage, images, name, square, year, section, typeFilter, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                   (mainimage, images, name, square, year, section, typeFilter, city))
    conn.commit()
    cursor.close()
    conn.close()
    return "Project added"


def rem_project(name):
    conn, cursor = get_db()
    cursor.execute("DELETE FROM project WHERE name = ?", (name,))
    conn.commit()
    cursor.close()
    conn.close()
    return "Project removed"

def get_project_by_name(id):
    conn, cursor = get_db()
    cursor.execute("SELECT * FROM project WHERE id = ?", (id,))
    project = cursor.fetchone()
    cursor.close()
    conn.close()
    return project

# ----------------- Flower -----------------
def get_flowers():
    conn, cursor = get_db()
    cursor.execute("SELECT * FROM flower")
    flowers = cursor.fetchall()
    cursor.close()
    conn.close()
    return flowers


def add_flower(mainphoto, images, square, name, year, id_s):
    conn, cursor = get_db()
    cursor.execute("INSERT INTO flower (mainphoto, images, square, name, year, id) VALUES (?, ?, ?, ?, ?, ?)",
                   (mainphoto, images, square, name, year, id_s))
    conn.commit()
    cursor.close()
    conn.close()
    return "Flower added"


def rem_flower(name):
    conn, cursor = get_db()
    cursor.execute("DELETE FROM flower WHERE name = ?", (name,))
    conn.commit()
    cursor.close()
    conn.close()
    return "Flower removed"