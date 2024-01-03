# SSRS Web App Documentation**

## Login Page

Input username, password, and domain

If the username, password, or domain are incorrect, the reports will not be displayed.

## Report Viewer Page

logout()
- When the button is clicked, navigate to the login page.
  
execute()
- Fetch the reports based on the username, password, and domain
  
useEffect()
- A method that is applied to make sure the reports are displayed.
- Without this, the reports from the server are not shown.
  
Display the reports in rows. Each row has its own container.

ReportRow.jsx
- Each ReportRow object has a PDFDownload feature and an HTMLViewer feature.

ReportDataDisplay.jsx
- A dropwdown feature
- When each report is clicked, a dropdown box is displayed. The dropwdown box provides information on the name of the report, the data the   report was created, and the most recent data the report was edited.

## PDF Download
handleDownloadPDF
- Use the API fetch method to create a response
- Create a pdfByteArray based on the response
	- `const pdfByteArray = await response.arrayBuffer();`
- Create a pdfBlob which is a “Blob” object that takes in the pdfByteArray.
	- `const pdfBlob = new Blob([pdfByteArray], { type: “application/pdf” });`
- Create a url based on the pdfBlob
	- `const pdfURL = URL.createObjectURL(pdfBlob);`
- The pdfURL is used to create a link that is integrated into the UI.

Method is called when the “pdf button” is clicked 

## HTML Viewer

handleViewHTML
Use the API fetch to create a response
Open a new window
`const newWindow = window.open(“”, “_blank”);`
	- Write the html in the new window
- Method is called when the “html button” is clicked
  
## Backend API
SSRS Client
- constructNtlmAuthHttpClient()
	- Used to create a “CloseableHttpClient” with NTLM authentication
	- NTLM authentication is required to access the API
	- RequestConfig config = RequestConfig.custom()
		- RequestConfig is a class used to configure various parameters for making HTTP requests.
		- The “config” object is used when creating the httpClient
	- PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager();
		- responsible for managing and pooling HTTP connections
	- CredentialsProvider credProvider = new BasicCredentialsProvider();
		- Add all of the credentials for NTLM Authentication
	- AuthSchemeProvider
	- HttpClientBuilder httpClientBuilder = HttpClientBuilder.create()
		- Uses credsProvider, authSchemeRegistry, connectionManager to create the httpClient that will be returned
- getReportList()
	- Get the server url
	- CloseableHttpResponse response = httpClient.execute(httpGet);
		- Get a response using the httpClient
	- Using the response, grab the report list and return it
- downloadReport()
	- The report is downloaded as a PDF by returning a byte array.
- getHTML()
	- The method returns the HTML of the SSRS report as a string
   
## Report Controller

Spring Framework

API used to grab the SSRS client and reports
- “import org.springframework.beans.factory.annotation”
	- “Support package for annotation-driven bean configuration” (javadoc-api)
- “import org.springframework.web.bind.annotation”
	- “Annotations for binding requests to controllers and handler methods as well as for binding request parameters to method arguments” 
getReports()
- Maps function to a GET HTTP request with alias/reports headers for username, password, and domain.
- Initializes and passes credentials into an SSRSClient Object
- Set server URL to the report server that is currently being used
- Returns String of reports
downloadReports()
- SSRS Client would be established by this point
- mapped onto “/reports/download/{reportName}”
- calls downloadReport on the SSRSClient, returns byte[]
getHTML()
- SSRS Client would be established by this point
- mapped to “/reports/getHTML/{reportName}”
- a method that handles the get request
- calls getHTML() on SSRSClient returns the html of report in String form
    
## SSRS Backend Application

The Spring Application is run here.

