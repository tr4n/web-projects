package com.example.sqlitetest.databases;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.sqlitetest.models.PictureModel;

import java.util.ArrayList;
import java.util.List;

public class DBManager {
    private static DBManager dbManager;
    private static final String PICTURE_TABLE = "tbl_picture";
    private DatabaseHelper databaseHelper;
    private SQLiteDatabase sqLiteDatabase;


    public  static DBManager getInstance(Context context) {
        if (dbManager == null) {
            dbManager = new DBManager(context);
        }
        return dbManager;
    }

    public DBManager(Context context) {
        this.databaseHelper = new DatabaseHelper(context);

        this.sqLiteDatabase = databaseHelper.getWritableDatabase();
    }

    public List<PictureModel> getPictureModelList() {
        List<PictureModel> pictureModelList = new ArrayList<>();

        Cursor cursor = sqLiteDatabase.rawQuery("select * from " +  PICTURE_TABLE, null);
        cursor.moveToFirst();
        while (cursor.moveToNext()) {
            int id = cursor.getInt(0);
            String title = cursor.getString(1);
            String description = cursor.getString(2);
            String url = cursor.getString(3);
            String area = cursor.getString(4);
            pictureModelList.add(new PictureModel(
                    id,
                    title,
                    description,
                    url,
                    area
            ));
        }
        ;
        return pictureModelList;
    }
}
