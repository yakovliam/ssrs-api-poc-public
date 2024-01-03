package com.tarigma.ssrs;

import java.io.IOException;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportController {

    @Autowired
    private SSRSClient ssrsClient;

    // when logging in, the user must provide their username, password, and domain
    // as headers in the HTTP GET request ("Username", "Password", and "Domain"")
    @GetMapping(value = "/reports", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getReports(@RequestHeader("Username") String username, @RequestHeader("Password") String password,
            @RequestHeader("Domain") String domain) throws IOException {
        ArrayList<String> creds = new ArrayList<String>();
        creds.add(username);
        creds.add(password);
        creds.add(domain);
        ssrsClient.setServerUrl("http://10.10.9.128/reports/api/v2.0");
        ssrsClient.setHttpClient(SSRSClient.constructNtlmAuthHttpClient(35, 35, creds));
        return ssrsClient.getReportList();

    }

    @GetMapping(value = "/reports/download/{reportName}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] downloadReports(@PathVariable String reportName) throws IOException {
        return ssrsClient.downloadReport(reportName, "http://10.10.9.128/");
    }

    @GetMapping(value = "reports/getHTML/{reportName}", produces = MediaType.TEXT_HTML_VALUE)
    public String getHTML(@PathVariable String reportName) throws IOException {
        return ssrsClient.getHTML(reportName, "http://10.10.9.128/");
    }
}
