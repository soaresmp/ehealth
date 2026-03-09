import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const aiInsights = [
  {
    category: 'Epidemic Prediction',
    severity: 'high',
    icon: '🔴',
    title: 'Malaria surge predicted — Northern Ghana',
    description: 'ML model (LSTM) forecasts 40-60% increase in malaria cases in Northern Region within 21 days based on rainfall patterns, historical data, and current case trajectory.',
    confidence: 87,
    action: 'Pre-position 50,000 ACT treatment courses',
    model: 'EpiPredict v3.2',
  },
  {
    category: 'Fraud Detection',
    severity: 'high',
    icon: '🔴',
    title: 'Prescription fraud cluster detected',
    description: 'Anomaly detection identified 3 healthcare providers issuing 5× the average number of controlled substance prescriptions. Patterns suggest possible diversion.',
    confidence: 91,
    action: 'Flag for immediate investigation',
    model: 'FraudGuard v2.1',
  },
  {
    category: 'Healthcare Access',
    severity: 'medium',
    icon: '🟡',
    title: 'Northern Region healthcare gap analysis',
    description: 'Geospatial model identifies 127,000 residents with >50km distance to nearest health facility. Telemedicine expansion recommended.',
    confidence: 94,
    action: 'Deploy 5 mobile health units',
    model: 'AccessMap v1.8',
  },
  {
    category: 'Drug Resistance',
    severity: 'medium',
    icon: '🟡',
    title: 'Emerging artemisinin resistance signal',
    description: 'Treatment response data from 12 facilities shows 8% reduction in malaria clearance rates. Possible early artemisinin partial resistance signal.',
    confidence: 73,
    action: 'Genomic surveillance activation',
    model: 'ResistanceWatch v4.0',
  },
  {
    category: 'Chronic Disease',
    severity: 'medium',
    icon: '🟡',
    title: 'Diabetes epidemic trajectory',
    description: 'Predictive model estimates 34% increase in Type 2 Diabetes prevalence in urban areas by 2028 if current trends continue. Prevention urgently needed.',
    confidence: 89,
    action: 'Launch urban prevention program',
    model: 'NCDPredict v2.5',
  },
  {
    category: 'Supply Chain',
    severity: 'low',
    icon: '🟢',
    title: 'Vaccine cold chain optimization',
    description: 'Optimization model suggests 23% cost reduction in vaccine distribution by rerouting via 3 central hubs. Maintains 99.7% coverage.',
    confidence: 96,
    action: 'Implement route optimization',
    model: 'ColdChain Optimizer v1.3',
  },
]

const aiModels = [
  { name: 'EpiPredict', purpose: 'Epidemic forecasting', accuracy: '87%', status: 'active' },
  { name: 'DiagAssist', purpose: 'Diagnostic support', accuracy: '91%', status: 'active' },
  { name: 'FraudGuard', purpose: 'Insurance & Rx fraud', accuracy: '94%', status: 'active' },
  { name: 'ImageAI', purpose: 'Medical imaging analysis', accuracy: '89%', status: 'training' },
  { name: 'RiskScore', purpose: 'Patient risk stratification', accuracy: '83%', status: 'active' },
  { name: 'DrugSafe', purpose: 'Drug interaction detection', accuracy: '99.2%', status: 'active' },
]

export default function AIAnalyticsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="AI & Advanced Analytics" subtitle="Machine learning models and predictive health intelligence" />
      <div className="p-6 space-y-6">
        {/* AI overview */}
        <div className="gradient-health rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-3xl">🤖</div>
            <div>
              <h2 className="text-xl font-bold">EHealth Africa AI Engine</h2>
              <p className="text-blue-100">6 active models • 2.3M+ data points processed today</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active AI Models', value: '6' },
              { label: 'Alerts Generated', value: '1,234' },
              { label: 'Fraud Prevented', value: 'GHS 4.2M' },
              { label: 'Avg Accuracy', value: '90.7%' },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-xl px-4 py-3 text-center">
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs text-blue-200 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI insights */}
        <Card>
          <CardHeader title="Active AI Insights & Alerts" icon={<span>🔍</span>} />
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div key={i} className={`border rounded-xl p-4 ${
                insight.severity === 'high' ? 'border-red-200 bg-red-50' :
                insight.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                'border-green-200 bg-green-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{insight.icon}</span>
                      <Badge variant="outline" size="sm">{insight.category}</Badge>
                      <span className="text-xs text-gray-400">Model: {insight.model}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-500">Confidence:</span>
                        <div className="w-20 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${insight.confidence > 85 ? 'bg-green-500' : insight.confidence > 70 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                            style={{ width: `${insight.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">{insight.confidence}%</span>
                      </div>
                      <span className="text-xs text-blue-600 font-medium">→ {insight.action}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="ghost">Details</Button>
                    <Button size="sm" variant="primary">Act</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI models registry */}
        <Card>
          <CardHeader title="AI Model Registry" icon={<span>⚙️</span>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {aiModels.map(model => (
              <div key={model.name} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{model.name}</span>
                  <Badge variant={model.status === 'active' ? 'success' : 'warning'} size="sm">
                    {model.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mb-2">{model.purpose}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Accuracy:</span>
                  <span className="text-sm font-bold text-green-700">{model.accuracy}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance notice */}
        <Card className="bg-gray-900 text-white">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔬</span>
            <div>
              <h3 className="font-semibold">Research Data Anonymization</h3>
              <p className="text-gray-300 text-sm mt-1">
                All AI models are trained on anonymized, de-identified patient data in compliance with GDPR-style
                privacy standards. Patient identities cannot be re-identified from model outputs.
                Patients must provide explicit consent for research data usage via the Health ID consent management portal.
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="success" size="sm">✓ k-Anonymity applied</Badge>
                <Badge variant="success" size="sm">✓ Differential privacy</Badge>
                <Badge variant="success" size="sm">✓ GDPR compliant</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
