package com.example.mapchattestfirst;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FacebookAuthProvider;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.squareup.picasso.Picasso;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class MainActivity extends AppCompatActivity {

    private static final Bundle RC_SIGN_IN = null;
    @BindView(R.id.et_username)
    EditText etUsername;
    @BindView(R.id.et_password)
    EditText etPassword;
    @BindView(R.id.bt_sign_up)
    Button btSignUp;
    @BindView(R.id.bt_sign_in)
    Button btSignIn;
    @BindView(R.id.bt_facebook)
    LoginButton btFacebook;
    @BindView(R.id.bt_google)
    SignInButton btGoogle;
    @BindView(R.id.bt_logout)
    Button btLogout;
    @BindView(R.id.iv_avatar)
    ImageView ivAvatar;

    private final int FACEBOOK_ACCOUNT = 1, GOOGLE_ACCOUNT = 2, EMAIL = 3, LOGIN = 10, LOGOUT = 11;
    private final String webClientId = "992606081267-p5lijc0ugo2phvnebptfmslbtqkphge3.apps.googleusercontent.com";

    CallbackManager callbackManager;
    FirebaseAuth firebaseAuth;
    GoogleSignInClient googleSignInClient;
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //   FirebaseApp.initializeApp(MainActivity.this);

        ButterKnife.bind(this);
        FirebaseApp.initializeApp(this);
        firebaseAuth = FirebaseAuth.getInstance();

        setupFacebookAuth();
        initGoogleAuth();
        initEmailPasswordAuth();
    }


    @OnClick({R.id.bt_sign_up, R.id.bt_sign_in, R.id.bt_facebook, R.id.bt_google, R.id.bt_logout})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.bt_sign_up:
                break;
            case R.id.bt_sign_in:

                break;
            case R.id.bt_facebook:

                break;
            case R.id.bt_google:
                googleSignIn();
                break;
            case R.id.bt_logout:
                LoginManager.getInstance().logOut();
                if(googleSignInClient != null) googleSignInClient.signOut();
                updateUI(null);
                Toast.makeText(MainActivity.this, "Logout", Toast.LENGTH_SHORT).show();
                ;
                break;
        }
    }


    @Override
    protected void onStart() {
        super.onStart();
        //    FirebaseApp.initializeApp(this);
        //   FirebaseUser currentUser = firebaseAuth.getCurrentUser();
        //    updateUI(currentUser);
//        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(this);
//        updateUI(account);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == LOGIN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                // Google Sign In was successful, authenticate with Firebase
                GoogleSignInAccount account = task.getResult(ApiException.class);
                firebaseAuthWithGoogle(account);
            } catch (ApiException e) {
                // Google Sign In failed, update UI appropriately
                Log.w(TAG, "Google sign in failed", e);
                // ...
            }
        } else {
            // Pass the activity result back to the Facebook SDK
            callbackManager.onActivityResult(requestCode, resultCode, data);
        }
    }

    private void updateUI(FirebaseUser currentUser) {
        if (currentUser != null) {
            String url = currentUser.getPhotoUrl().toString();
            url = url.contains("facebook") ? url + "?type=large"
                    : url.contains("google") ? url + "?sz=150"
                    : url;
            Log.d(TAG, "updateUI: " + url);
            Picasso.get().load(url).into(ivAvatar);
        }else{
            Picasso.get().load("https://sunrisepublish.com/wp-content/uploads/2016/03/placeholder-profile-male.jpg").into(ivAvatar);
        }


    }

    private void setupFacebookAuth() {
        callbackManager = CallbackManager.Factory.create();
        btFacebook.setReadPermissions("email", "public_profile");
        btFacebook.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                Log.d(TAG, "facebook:onSuccess:" + loginResult);
                handleFacebookAccessToken(loginResult.getAccessToken());
            }


            @Override
            public void onCancel() {
                Log.d(TAG, "facebook:onCancel");
                // ...
            }

            @Override
            public void onError(FacebookException error) {
                Log.d(TAG, "facebook:onError", error);
            }


        });

    }

    private void handleFacebookAccessToken(AccessToken accessToken) {
        Log.d(TAG, "handleFacebookAccessToken:" + accessToken);

        AuthCredential credential = FacebookAuthProvider.getCredential(accessToken.getToken());
        firebaseAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d(TAG, "signInWithCredential:success");
                            FirebaseUser user = firebaseAuth.getCurrentUser();
                            updateUI(user);
                        } else {
                            // If sign in fails, display a message to the user.
                            Log.w(TAG, "signInWithCredential:failure", task.getException());
                            Toast.makeText(MainActivity.this, "Authentication failed.",
                                    Toast.LENGTH_SHORT).show();
                            updateUI(null);
                        }

                        // ...
                    }
                });
    }


    private void initGoogleAuth() {
        // Configure sign-in to request the user's ID, email address, and basic
// profile. ID and basic profile are included in DEFAULT_SIGN_IN.
        // Configure Google Sign In
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(webClientId)
                .requestEmail()
                .build();
        googleSignInClient = GoogleSignIn.getClient(this, gso);

    }

    private void googleSignIn() {
        firebaseAuth.signOut();
        startActivityForResult(googleSignInClient.getSignInIntent(), LOGIN);
    }

    private void firebaseAuthWithGoogle(GoogleSignInAccount acct) {
        Log.d(TAG, "firebaseAuthWithGoogle:" + acct.getId());

        AuthCredential credential = GoogleAuthProvider.getCredential(acct.getIdToken(), null);
        firebaseAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d(TAG, "signInWithCredential:success");
                            FirebaseUser user = firebaseAuth.getCurrentUser();
                            updateUI(user);
                        } else {
                            // If sign in fails, display a message to the user.
                            Log.w(TAG, "signInWithCredential:failure", task.getException());
                            updateUI(null);
                        }

                        // ...
                    }
                });
    }

    private void initEmailPasswordAuth() {

    }


}
