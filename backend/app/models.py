import sqlite3

class URLDatabase:
    def __init__(self, db_path="urls.db"):
        self.db_path = db_path
        self.create_table()

    def connect(self):
        return sqlite3.connect(self.db_path)

    def create_table(self):
      conn = self.connect()
      cur = conn.cursor()
      cur.execute("""
          CREATE TABLE IF NOT EXISTS urls (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              code TEXT UNIQUE,
              long_url TEXT,
              user_token TEXT
          )
      """)
      conn.commit()
      conn.close()

    def insert_url(self, code, long_url, user_token):
      conn = self.connect()
      cur = conn.cursor()
      cur.execute(
          "INSERT INTO urls (code, long_url, user_token) VALUES (?, ?, ?)",
          (code, long_url, user_token)
      )
      conn.commit()
      conn.close()

    def get_url(self, code):
        conn = self.connect()
        cur = conn.cursor()
        cur.execute("SELECT long_url FROM urls WHERE code=?", (code,))
        result = cur.fetchone()
        conn.close()
        return result[0] if result else None

    def get_all(self):
        conn = self.connect()
        cur = conn.cursor()
        cur.execute("SELECT * FROM urls")
        rows = cur.fetchall()
        conn.close()
        return rows
    
    def get_user_urls(self, user_token):
      conn = self.connect()
      cur = conn.cursor()
      cur.execute("SELECT code, long_url FROM urls WHERE user_token=?", (user_token,))
      rows = cur.fetchall()
      conn.close()
      return rows

