import pandas as pd
import numpy as np
import sqlite3

def get_user_stats(user_token):
    conn = sqlite3.connect("urls.db")
    df = pd.read_sql_query(
        f"SELECT long_url FROM urls WHERE user_token = '{user_token}'",
        conn
    )
    conn.close()

    if df.empty:
        return {"message": "No URLs created yet"}

    df["url_length"] = df["long_url"].apply(len)
    df["domain"] = df["long_url"].str.extract(r"https?://([^/]+)")

    return {
        "total_urls": int(len(df)),
        "avg_url_length": float(df["url_length"].mean()),
        "most_common_domain": df["domain"].mode()[0]
    }

