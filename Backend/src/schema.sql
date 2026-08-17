CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('instructor', 'admin') NOT NULL DEFAULT 'instructor',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS deliverables (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(160) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL,
  deliverable_type ENUM('software-grid', 'planning', 'mid-sem', 'later-work') NOT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  summary TEXT NOT NULL,
  presentation_date DATE,
  authors JSON NOT NULL,
  commit_url VARCHAR(500),
  deployment_url VARCHAR(500),
  file_name VARCHAR(255),
  file_path VARCHAR(500),
  created_by INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_deliverable_author FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS file_assets (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  deliverable_id INT UNSIGNED NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(150),
  size_bytes BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_asset_deliverable FOREIGN KEY (deliverable_id) REFERENCES deliverables(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS versions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  deliverable_id INT UNSIGNED NOT NULL,
  version_label VARCHAR(40) NOT NULL,
  change_summary TEXT NOT NULL,
  published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_by INT UNSIGNED NOT NULL,
  CONSTRAINT fk_version_deliverable FOREIGN KEY (deliverable_id) REFERENCES deliverables(id) ON DELETE CASCADE,
  CONSTRAINT fk_version_author FOREIGN KEY (published_by) REFERENCES users(id),
  UNIQUE KEY unique_deliverable_version (deliverable_id, version_label)
);
