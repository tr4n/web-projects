package com.example.sqlitetest.activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.example.sqlitetest.models.PictureModel;
import com.example.sqlitetest.R;
import com.example.sqlitetest.databases.DBManager;

import java.util.List;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        List<PictureModel> pictureModelList = DBManager.getInstance(this).getPictureModelList();
        Log.d(TAG, "onCreate: " + pictureModelList);
    }
}
