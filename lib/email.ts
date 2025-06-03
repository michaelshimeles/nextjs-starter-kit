interface emailProps {
  email: string;
  invitedByUsername: string;
  invitedByEmail: string;
  teamName: string;
  inviteLink: string;
}

export async function sendOrganizationInvitation({
  email,
  invitedByEmail,
  teamName,
  inviteLink,
}: emailProps) {
  try {
    const response = await fetch("https://app.loops.so/api/v1/transactional", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        transactionalId: process.env.LOOPS_TRANSACTION_ID,
        addToAudience: true,
        dataVariables: {
          invitedByEmail,
          teamName,
          inviteLink,
        },
      }),
    });

    const result = await response.json();

    console.log("result", result);
    return result;
  } catch (error) {
    return error;
  }
}
