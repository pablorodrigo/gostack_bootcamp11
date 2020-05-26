# Recovery password

**Functional Requirement**

- The user has to recover his password filling the form with the email;
- The user has to receive an email with instructions how to recovery a password;
- The user has to reset his password.

**Non-Functional Requirement**

- System will use Mailtrap to test emails sent during DEV environment;
- System will use Amazon SES to send emails during production environment;
- Sending emails will work in background job.

**Business rule**

- The link sent through email have to expire by 2h;
- The user have to confirm his new password during reset password process.

# Update Perfil

**Functional Requirement**

- The user has to update his name, email and password.

**Non-Functional Requirement**

- The user cannot update his email to an email already registered;
- The user must duty to report his past password to update it;
- The user must confirm his new password to update it.

# Service provider painel

**Functional Requirement**

- User has to list his appointments;
- Provider has to receive a notification always when is booked an appointment to him;
- Provider has to see notifications that was not read.

**Non-Functional Requirement**

- The provider's appointments must be storage as cache;
- The provider's notifications must be storage in MongoDB;
- The provider's notifications must be sent in real time using Socket.io.

**Business rule**

- A notification has to have a status such as read and not read in order to provider can manager it.


# Appointments


**Functional Requirement**

- The user has to list all services provider registered;
- The user has to list by days of a month at least one available time for a service provider;
- The user has to list an available hour on the specific day from service provider;
- The user has to book an appointment with a service provider.

**Non-Functional Requirement**

- The list of providers has to be storage as cache

**Business rule**

- Each appointment has to last about 1h;
- The appointment has to be available between 8am and 6pm;
- User cannot book an appointment on an hour already booked;
- User cannot book an appointment before of a recently time;
- User cannot book an appointment to himself.
