package com.tarigma.ssrs;

//imports
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import org.apache.http.HttpEntity;
import org.apache.http.auth.AuthSchemeProvider;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.NTCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.config.AuthSchemes;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.impl.auth.NTLMSchemeFactory;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;

@Component
// SSRSClient class is used to connect to the SSRS server and retrieve SSRS
// Reports and download them in PDF format or HTML format
// It supports NTLM authentication and uses a CloseableHttpClient to make HTTP
// requests
public class SSRSClient {

    private String serverUrl; // SSRS API base URL (e.g. http://{reportserver}/reports/api/v2.0)

    CloseableHttpClient httpClient; // CloseableHttpClient to make HTTP requests

    // constructNtlmAuthHttpClient method is used to construct a CloseableHttpClient
    // with NTLM authentication, which is required to access the API
    // credentials is an ArrayList of Strings containing the username, password, and
    // domain of the user
    static CloseableHttpClient constructNtlmAuthHttpClient(int connectionTimeout, int connectionRequestTimeout,
            ArrayList<String> credentials) {
        RequestConfig config = RequestConfig.custom()
                .setConnectTimeout(connectionTimeout * 1000)
                .setConnectionRequestTimeout(connectionRequestTimeout * 1000)
                .setCookieSpec(CookieSpecs.DEFAULT)
                .setTargetPreferredAuthSchemes(
                        Arrays.asList(AuthSchemes.NTLM, AuthSchemes.KERBEROS, AuthSchemes.SPNEGO))
                .build();

        PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager();

        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(AuthScope.ANY,
                new NTCredentials(credentials.get(0), credentials.get(1), "", credentials.get(2)));
        Registry<AuthSchemeProvider> authSchemeRegistry = RegistryBuilder.<AuthSchemeProvider>create()
                .register(AuthSchemes.NTLM, new NTLMSchemeFactory())
                .build();

        HttpClientBuilder httpClientBuilder = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credsProvider)
                .setDefaultAuthSchemeRegistry(authSchemeRegistry)
                .setConnectionManager(connectionManager)
                .setDefaultCookieStore(new BasicCookieStore())
                .setDefaultRequestConfig(config);

        return httpClientBuilder.build();
    }

    public SSRSClient(
            @Value("") String serverUrl) {
        this.serverUrl = serverUrl;
    }

    public void setServerUrl(String serverUrl) {
        this.serverUrl = serverUrl;
    }

    public void setHttpClient(CloseableHttpClient httpClient) {
        this.httpClient = httpClient;
    }

    // getReportList method is used to retrieve a list of all reports on the report
    // server as JSON data
    public String getReportList() throws IOException {
        String reportUrl = serverUrl + "/Reports";
        HttpGet httpGet = new HttpGet(reportUrl);
        httpGet.addHeader("Content-type", "application/json; charset=utf-8");
        CloseableHttpResponse response = httpClient.execute(httpGet);
        String json = EntityUtils.toString(response.getEntity(), "UTF-8");
        return json;
    }

    // downloadReport method is used to download a report from the server as a byte
    // array (this gets sent to the front end as a byte array)
    public byte[] downloadReport(String reportName, String serverUrl) throws IOException {
        String ssrsDownloadUrl = serverUrl + "/ReportServer?/" + reportName + "&rs:Format=PDF";
        HttpGet httpGet = new HttpGet(ssrsDownloadUrl);
        httpGet.addHeader("Content-type", "application/pdf; charset=utf-8");
        CloseableHttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();
        byte[] pdf = EntityUtils.toByteArray(entity);
        return pdf;
    }

    // getHTML returns the HTML of the report as a String
    public String getHTML(String reportName, String serverUrl) throws IOException {

        String ssrsDownloadUrl = serverUrl + "ReportServer?%2f" + reportName + "&rs:Format=HTML4.0&rc:toolbar=false";
        HttpGet httpGet = new HttpGet(ssrsDownloadUrl);
        httpGet.addHeader("Content-type", "text/html; charset=utf-8");
        CloseableHttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();
        String html = EntityUtils.toString(entity, "UTF-8");
        return html;
    }

}