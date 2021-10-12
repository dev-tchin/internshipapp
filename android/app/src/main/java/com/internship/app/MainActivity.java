package com.internship.app;

//Performing Main activity imports and configurations
import android.os.Bundle;
import com.getcapacitor.community.facebooklogin.FacebookLogin;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(com.getcapacitor.community.facebooklogin.FacebookLogin.class);
    }
}
