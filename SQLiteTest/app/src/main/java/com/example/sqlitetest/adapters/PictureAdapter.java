package com.example.sqlitetest.adapters;

import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.ViewGroup;

public class PictureAdapter extends RecyclerView.Adapter<PictureAdapter.PictureViewHolder> {

    @NonNull
    @Override
    public PictureViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        return null;
    }return

    @Override
    public void onBindViewHolder(@NonNull PictureViewHolder pictureViewHolder, int i) {

    }

    @Override
    public int getItemCount() {
        return 0;
    }

    public class PictureViewHolder extends RecyclerView.ViewHolder {

        public PictureViewHolder(@NonNull View itemView) {
            super(itemView);
        }
    }
}
