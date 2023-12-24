export const contactTemplate = (name, email, phone, interested, projectName) => {
    console.log(projectName);
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>Contact</title>
        <style>
          
        </style>
    </head>
    
    <body>
        <div>
        <h1>${projectName}</h1>
        <h2>${name}</h2>
        <p>${email}</p>
        <p>${phone}</p>
        <p>${interested}</p>
        </div>
    </body>
    
    </html>
    `
}