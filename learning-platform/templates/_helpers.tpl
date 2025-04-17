{{/*
Expand the name of the chart.
*/}}
{{- define "learning-platform.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "learning-platform.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "learning-platform.labels" -}}
helm.sh/chart: {{ include "learning-platform.chart" . }}
{{ include "learning-platform.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "learning-platform.selectorLabels" -}}
app.kubernetes.io/name: {{ include "learning-platform.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "learning-platform.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a fully qualified service name for a specific service.
*/}}
{{- define "learning-platform.serviceName" -}}
{{- $serviceName := index . 0 -}}
{{- $context := index . 1 -}}
{{- printf "%s-%s" $context.Release.Name $serviceName | trunc 63 | trimSuffix "-" }}
{{- end }}