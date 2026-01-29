# n8n Workflow Automation

This project uses self hosted [n8n](https://n8n.nomaden.cloud/) to automate the classification of customer feedback. The workflow automatically processes new feedback entries, categorizes them, and assigns priority based on their content.

## Workflow File

The workflow definition is located at:
[workflows/customer-feedback-workflow.json](../workflows/customer-feedback-workflow.json)

![n8n Workflow](assets/n8n-workflow.png)

## Workflow Logic

The "Customer Feedback" workflow performs the following steps:

1.  **Trigger**: Receives a webhook `POST` request when new feedback is submitted.
2.  **Analysis**: Checks the feedback description for keywords:
    - `error`
    - `bug`
    - `urgent`
3.  **Classification**:
    - **If matches (True Path)**:
      - Sets **Priority** to `High`
      - Sets **Category** to `Bug`
      - Sets **Status** to `Processed`
    - **If no match (False Path)**:
      - Sets **Priority** to `Low`
      - Sets **Category** to `General`
      - Sets **Status** to `Processed`
4.  **Database Update**: Updates the corresponding record in the Supabase `feedbacks` table.

## Setup Instructions

### 1. Install n8n

If you don't have n8n running, you can start it easily using Docker (recommended) or npm.

**Using Docker:**

```bash
docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-e GENERIC_TIMEZONE="UTC" \
	-e TZ="UTC" \
	docker.n8n.io/n8nio/n8n
```

**Using npm:**

```bash
npm install n8n -g
n8n start
```

Access the n8n dashboard at [http://localhost:5678](http://localhost:5678).

### 2. Import Workflow

1.  Open the n8n dashboard.
2.  Go to **Workflows** > **Import from File**.
3.  Select the `workflows/customer-feedback-workflow.json` file from this project.

### 3. Configure Credentials

The workflow requires access to your Supabase project.

1.  In n8n, look for the **Supabase** nodes (they might show a warning about missing credentials).
2.  Click on one of the Supabase nodes.
3.  Under **Credentials**, select **Create New**.
4.  Enter your Supabase details (found in your `.env` file):
    - **URL**: `NEXT_PUBLIC_SUPABASE_URL`
    - **Service Key**: `SUPABASE_SERVICE_ROLE_KEY` (Note: Use the Service Role key for write access, not the Anon key).

### 4. Setup Webhook

#### In n8n:

1.  Open the **New Feedback trigger** node.
2.  Note the **Test URL** and **Production URL**.
3.  When developing, ensure you are "Listening" for test events.
4.  For production usage, activating the workflow will enable the Production URL.

#### In Your Application:

Currently, the application needs to trigger this webhook. Ensure your feedback submission logic (e.g., in `src/actions/feedback.ts` or a database trigger) calls this webhook URL with the feedback record.

Example Payload Expected by Workflow:

```json
{
  "record": {
    "id": "uuid-of-feedback",
    "description": "I found a critical bug..."
  }
}
```

### 5. Troubleshooting

- **Webhook not triggering**: Ensure the URL matches exactly. If running n8n locally, you might need a tunnel (like `ngrok` or `localtunnel`) to make your localhost webhook accessible if your app is deployed remotely.
- **Supabase specific**: Ensure the `feedbacks` table exists and the user in the connection has UPDATE permissions.
