// GitHub API Service
const GITHUB_USERNAME = 'zaedarghazalba'; // Ganti dengan username GitHub Anda
const GITHUB_API = 'https://api.github.com';

export const githubService = {
  // Get user profile
  async getUserProfile() {
    try {
      const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`);
      if (!response.ok) throw new Error('Failed to fetch user profile');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  // Get user repositories
  async getUserRepos() {
    try {
      const response = await fetch(
        `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
      );
      if (!response.ok) throw new Error('Failed to fetch repositories');
      const repos = await response.json();

      // Sort by stars and updated date
      return repos.sort((a, b) => {
        const starsA = a.stargazers_count || 0;
        const starsB = b.stargazers_count || 0;
        if (starsB !== starsA) return starsB - starsA;
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
    } catch (error) {
      console.error('Error fetching repositories:', error);
      return [];
    }
  },

  // Get repository languages
  async getRepoLanguages(repoName) {
    try {
      const response = await fetch(
        `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/languages`
      );
      if (!response.ok) throw new Error('Failed to fetch languages');
      return await response.json();
    } catch (error) {
      console.error('Error fetching languages:', error);
      return {};
    }
  },

  // Get user stats
  async getUserStats() {
    try {
      const repos = await this.getUserRepos();

      const stats = {
        totalRepos: repos.length,
        totalStars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
        totalForks: repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0),
        languages: {},
        publicRepos: repos.filter(repo => !repo.private).length,
      };

      // Count languages
      repos.forEach(repo => {
        if (repo.language) {
          stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return null;
    }
  },

  // Get recent activity (simplified)
  async getRecentActivity() {
    try {
      const response = await fetch(
        `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=10`
      );
      if (!response.ok) throw new Error('Failed to fetch activity');
      return await response.json();
    } catch (error) {
      console.error('Error fetching activity:', error);
      return [];
    }
  },

  // Get pinned repositories (using most starred as fallback)
  async getPinnedRepos() {
    try {
      const repos = await this.getUserRepos();
      // Return top 6 repositories by stars
      return repos.slice(0, 6);
    } catch (error) {
      console.error('Error fetching pinned repos:', error);
      return [];
    }
  }
};

export default githubService;
