// Database connection utility
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'udaan_collective',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to execute SQL queries
export async function executeQuery({ query, values = [] }: { query: string; values?: any[] }) {
  try {
    const [results] = await pool.execute(query, values);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Initialize database tables if they don't exist
export async function initializeDatabase() {
  try {
    // Create users table
    await executeQuery({
      query: `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        user_type ENUM('individual', 'ngo', 'company') NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (email),
        INDEX (user_type)
      )`
    });

    // Create user_profiles table for additional info based on user type
    await executeQuery({
      query: `CREATE TABLE IF NOT EXISTS user_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        profile_data JSON NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`
    });

    console.log('Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
    return false;
  }
}

export default pool;