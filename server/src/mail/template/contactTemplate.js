export const contactTemplate = (name, email, phone, interested) => {
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
        <h2>${name}</h2>
        <p>${email}</p>
        <p>${phone}</p>
        <p>${interested}</p>
        </div>
    </body>
    
    </html>
    `
}