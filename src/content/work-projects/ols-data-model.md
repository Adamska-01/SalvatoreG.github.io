---
title: OLS Data Model - WPS
summary: Shared data models for OLS apps, API, and internal QA Dashboard.
dateRange: 2024 - 2025
order: 2
group: West Pier Studio - Unity
preview: ../../assets/WorkProjects/OLSDataModel/Preview.png
technologies:
  - C_Sharp
---

**OLS Data Model** is a shared repository containing the request and response data models used by the 3 OLS Unity apps, the internal QA Dashboard, and the backend API.

To ensure consistency and reduce code duplication, the models are distributed as a **versioned NuGet package** for the API and QA Dashboard, and as a **Unity package** (compatible with the Unity Package Manager) for the Unity apps.

Unity in particular required custom handling due to its requirement for **`.meta`** files for every file and folder the package includes. Additionally, its limited support for modern .NET features like **`init`**, **`records`**, **`with`**, and the **`System.Text.Json`** serializer introduced compatibility challenges.

Ultimately, I automated the build and packaging process using **Bitbucket Pipelines**, generating NuGet and UPM packages on every commit (versioning followed defined rules).

This project strengthened my skills in cross-platform **package management**, **CI/CD automation**, and maintaining consistent data models across multiple systems.