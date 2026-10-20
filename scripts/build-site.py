"""Package tracked website assets for GitHub Pages, without local scratch files."""

from pathlib import Path
import shutil
import subprocess


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "_site"
ASSET_DIRECTORIES = {
    "css", "js", "Images", "docs", "Individual Thesis", "Presentations",
    "Proposals", "UI Dashboards", "Checklist", "Profile Photos", "Project Charter",
}
ROOT_FILES = {
    "index.html", "Final_Thesis_Draft.pdf", "Topic Assessment Form.pdf",
    "A_Multi_Stage_Artificial_Intelligence_Framework_for_Proactive_Livestock_Health_Monitoring_and_Outbreak_Surveillance.pdf",
}


def main():
    tracked = subprocess.check_output(
        ["git", "ls-files", "-z"], cwd=ROOT
    ).decode("utf-8").split("\0")
    assets = [
        Path(name) for name in tracked
        if name and (name in ROOT_FILES or Path(name).parts[0] in ASSET_DIRECTORIES)
    ]
    if Path("index.html") not in assets:
        raise SystemExit("Track index.html with git add before packaging the website.")

    # Keep cleanup inside this project's fixed output directory.
    if OUTPUT.resolve() != ROOT / "_site":
        raise SystemExit("Refusing to clear an output directory outside this project.")
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()

    for relative in assets:
        source = ROOT / relative
        if source.is_symlink():
            raise SystemExit(f"Website assets must be regular files: {relative}")
        destination = OUTPUT / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)

    (OUTPUT / ".nojekyll").touch()
    print(f"Prepared {len(assets)} tracked website assets in _site/.")


if __name__ == "__main__":
    main()
